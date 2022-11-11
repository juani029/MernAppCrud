/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/postContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", description: "", image: null });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
        });
        if (post.image) {
          setPost({
            image: post.image,
            title: post.title,
            description: post.description,
          });
        }
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          {params.id ? (
            <h3 className="text-xl">Edit Post</h3>
          ) : (
            <h3 className="text-xl">New Post</h3>
          )}
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300 ">
            Go back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else await createPost(values);
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400 mt-4"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                id="description"
                placeholder="Write a description"
                rows={3}
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400 mt-4"
              >
                Image
              </label>
              {post.image ? (
                <div className="flex flex-col w-1/2">
                  <img alt={post.title} src={post.image.url} />
                  <input
                    type="file"
                    className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mt-2"
                    name="image"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                  />
                </div>
              ) : (
                <input
                  placeholder="Upload"
                  type="file"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
