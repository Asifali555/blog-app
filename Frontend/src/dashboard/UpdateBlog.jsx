import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams(); // Get blog ID from URL

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null); // Store image file
  const [blogImagePreview, setBlogImagePreview] = useState(""); // Image preview

  // Handle Image Selection
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result); // Update preview
        setBlogImage(file); // Update state with actual file
      };
    }
  };

  useEffect(() => {
    // Fetch Existing Blog Data
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setBlogImage(data?.blogImage?.url)
        setBlogImagePreview(data?.blogImage?.url || ""); // Display existing image
      } catch (error) {
        console.log(error);
        toast.error("Error fetching blog details.");
      }
    };
    fetchBlog();
  }, [id]);

  // Handle Blog Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage) {
      formData.append("blogImage", blogImage); // Append image file only if changed
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error updating blog."
      );
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
            <img
              src={blogImagePreview || "/imgPL.webp"}
              alt="Blog Preview"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              accept="image/*"
              onChange={changePhotoHandler}
            />
          </div>

          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Something about your blog (at least 200 characters)"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
