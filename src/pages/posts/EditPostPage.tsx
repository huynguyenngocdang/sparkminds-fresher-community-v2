import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";
import { EPostType } from "../../types/enum";
import MainLayout from "../../layout/MainLayout";
import FormGroup from "../../components/ui/formGroup/FormGroup";
import Label from "../../components/ui/label/Label";
import Input from "../../components/ui/input/Input";
import TextArea from "../../components/ui/textarea/TextArea";
import Button from "../../components/ui/button/Button";
import { createPost, getPost, updatePost } from "../../api/postApi";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import { NOTIFICATION_EDIT_POST_SUCCESS, NOTIFICATION_ERROR_UNEXPECTED, NOTIFICATION_ERROR_UPLOAD_IMAGE, NOTIFICATION_LOGIN_REQUIRED } from "../../constants/Notification";


interface FormData {
  title: string;
  content?: string;
  images?: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string(),
  images: yup.mixed(),
});

const EditPostPage: React.FC = () => {
  const [mode, setMode] = useState<EPostType>(EPostType.TEXT);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchedImages = watch("images") as FileList;
  const { user } = useAuth() as any;

  useEffect(() => {
    if (watchedImages && watchedImages.length) {
      const fileArray = Array.from(watchedImages).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(fileArray);
    }
  }, [watchedImages]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        const post = await getPost(id);
        if (post) {
          setValue("title", post.title);
          setValue("content", post.content);
          setSelectedImages([post.imageUrl]);
          setMode(post.content ? EPostType.TEXT : EPostType.IMAGE);
        }
      }
    };
    fetchPostData();
  }, [id, setValue]);

  const uploadImageAndGetURL = async (imageFile: File): Promise<string> => {
    const storageRef = ref(storage, `images/${imageFile.name + Date.now()}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleCreatePost: SubmitHandler<FormData> = async (data) => {
    const username = sessionStorage.getItem("username");
    if (!user) {
      toast.error(NOTIFICATION_LOGIN_REQUIRED);
      return;
    }
    if (data.images) {
      try {
        const imageFiles = Array.from(data.images);
        const uploadPromises = imageFiles.map(uploadImageAndGetURL);
        const imageUrl = await Promise.all(uploadPromises);
        const postData = {
          id: id,
          title: data.title,
          content: null,
          imageUrl: imageUrl[0], // Assuming you only need the first image URL
          author: username,
          totalLikes: 0,
          createdDate: new Date().toISOString(),
          postType: mode,
          isDelete: false,
        };
        const response = await updatePost(id || "", postData);
        handleResponse(response);
      } catch (error) {
        console.error(NOTIFICATION_ERROR_UPLOAD_IMAGE, error);
      }
    }

    if (data.content) {
      const postData = {
        id: id,
        title: data.title,
        content: data.content,
        imageUrl: null,
        author: username,
        totalLikes: 0,
        createdDate: new Date().toISOString(),
        postType: mode,
        isDelete: false,
      };
      const response = await updatePost(id || "", postData);
      handleResponse(response);
    }

  };
  
  function handleResponse(response: any) {
    if (response && response.status === 200) {
      toast.success(NOTIFICATION_EDIT_POST_SUCCESS);
    } else {
      toast.error(NOTIFICATION_ERROR_UNEXPECTED);
    }
  }

  const toggleMode = (newMode: EPostType) => {
    setMode(newMode);
    if (newMode === EPostType.TEXT) {
      // If switching to TEXT mode, clear the images
      setSelectedImages([]);
      setValue("images", undefined); // Assuming you're using React Hook Form
    } else if (newMode === EPostType.IMAGE) {
      // If switching to IMAGE mode, clear the content
      setValue("content", ""); // Assuming you're using React Hook Form
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-[556px] bg-white rounded-xl">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl ">Create post</h2>
          <div className="flex items-center gap-3">
            <span
              className={`${
                mode === EPostType.TEXT
                  ? "border-b-2 border-b-primary  cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode(EPostType.TEXT)}
            >
              Text
            </span>
            <span
              className={`${
                mode === EPostType.IMAGE
                  ? "border-b-2 border-b-primary cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => toggleMode(EPostType.IMAGE)}
            >
              Image & Videos
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleCreatePost)}>
              <FormGroup>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  control={control}
                  name="title"
                  placeholder="Input your title here"
                  error={errors.title?.message}
                ></Input>
              </FormGroup>
              {mode === EPostType.TEXT && (
                <FormGroup>
                  <Label htmlFor="content">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <TextArea
                    control={control}
                    name="content"
                    placeholder="Input your content here"
                    error={errors.content?.message}
                  ></TextArea>
                </FormGroup>
              )}
              {mode === EPostType.IMAGE && (
                <FormGroup>
                  <Label>
                    Upload Images <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images")}
                  />
                  <div className="image-preview">
                    {selectedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Preview"
                        style={{ width: 100, height: 100 }}
                      />
                    ))}
                  </div>
                </FormGroup>
              )}
              <Button type="submit" className="w-full bg-primary">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Create Post"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditPostPage;
