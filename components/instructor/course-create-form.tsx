"use client";

import axiosInstance from "@/lib/axios-instance";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-toast-response";
import { CourseCreateState, CourseWithId } from "@/lib/interface/course";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CourseCreateFormProps {
  initialValues?: CourseWithId;
}

const defaultValues: CourseCreateState = {
  name: "arfat rahman",
  slug: "arfat-rahman",
  description:
    "Full stack web developer with 2 years of experience specializing in JavaScript frameworks like Node.js, React, Next.js, and React Native. Proficient in building RAG applications, integrating OpenAI products, and working with LangChain, Pusher, and vector databases. Skilled in database management (MySQL, PostgreSQL, MongoDB) and modern UI development using Tailwind CSS and Shadow DOM.",
  price: "0.00",
  uploading: false,
  category: "tommy vice city",
  image: "https://i.ibb.co.com/MgWXfH1/arfat-rahman-5.jpg",
  paid: false,
  loading: false,
  published: false,
};

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseCreateState>({
    defaultValues: initialValues || defaultValues,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const paid = watch("paid");
  const image = watch("image");

  const priceOptions = Array.from({ length: 92 }, (_, i) =>
    (i + 9.99).toFixed(2)
  );

  // Sync initial values on edit
  useEffect(() => {
    if (initialValues) {
      for (const [key, value] of Object.entries(initialValues)) {
        setValue(key as keyof CourseCreateState, value);
      }
    }
  }, [initialValues, setValue]);

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name" && value.name) {
        const generatedSlug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        setValue("slug", generatedSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit: SubmitHandler<CourseCreateState> = async (formData) => {
    try {
      setIsLoading(true);
      if (initialValues?._id) {
        const { data } = await axiosInstance.post(`/course/update-course`, {
          ...formData,
          price: String(formData.price),
          id: initialValues?._id,
        });
        if (data?.success) {
          frontendSuccessResponse(data?.message);
          router.push("/instructor");
          return;
        }
        return frontendErrorResponse(data?.message);
      } else {
        const { data } = await axiosInstance.post(
          `/course/create-course`,
          formData
        );
        if (data?.success) {
          frontendSuccessResponse(data?.message);
          router.push("/instructor");
          return;
        }
        return frontendErrorResponse(data?.message);
      }
    } catch (error) {
      console.log("response error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Course Name */}
      <div className="mb-4">
        <input
          type="text"
          {...register("name", { required: "Course name is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Course Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Slug */}
      <div className="mb-4">
        <input
          type="text"
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: "Slug must be lowercase and hyphen-separated",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Course Slug (e.g., typescript-for-beginners)"
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <textarea
          rows={10}
          {...register("description", {
            required: "Course description is required",
            minLength: {
              value: 20,
              message: "Description should be at least 20 characters",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Course Description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Paid Course + Price */}
      <div className="mb-4 flex items-center space-x-4">
        <label>
          <input
            type="checkbox"
            {...register("paid")}
            className="mr-2"
            onChange={(e) => {
              const checked = e.target.checked;
              setValue("paid", checked);
              if (checked) setValue("price", "9.99");
              if (!checked) setValue("price", "0.00");
            }}
          />
          Paid Course
        </label>

        {paid && (
          <select
            {...register("price", {
              validate: (value) =>
                paid && (!value || value === "0.00")
                  ? "Please select a price"
                  : true,
            })}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {priceOptions.map((price) => (
              <option key={price} value={price}>
                ${price}
              </option>
            ))}
          </select>
        )}
      </div>
      {errors.price && (
        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
      )}

      {/* Category */}
      <div className="mb-4">
        <input
          type="text"
          {...register("category", { required: "Category is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Course Category"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Course Image */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700">
          Upload Course Image
        </label>
        <input
          type="text"
          {...register("image", {
            required: "Course image URL is required",
            pattern: {
              value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
              message: "Please enter a valid image URL",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Course Image"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
        {image && (
          <div className="mt-2 relative">
            <Image
              src={image}
              alt="Preview"
              height={160}
              width={160}
              className="size-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="mb-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {isLoading
            ? "Saving..."
            : initialValues?._id
            ? "Update and Save"
            : "Save and Continue"}
        </button>
      </div>
    </form>
  );
};

export default CourseCreateForm;
