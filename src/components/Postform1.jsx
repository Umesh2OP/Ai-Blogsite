import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../Appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RTE from './RTE';
import toast from 'react-hot-toast';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Loader from '../components/Loader';

const Postform1 = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      Content: post?.Content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.Auth?.userData);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState('');
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedLang, setSelectedLang] = useState("English");
  const [titleSuggestions, setTitleSuggestions] = useState([]);

  const Slugtransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '')
        .replace(/\s+/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', Slugtransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, Slugtransform, setValue]);

  const submit = async (data) => {
    setAiLoading(true);
    setAiLoadingMessage(post ? "🔄 Updating post..." : "📝 Submitting post...");

    try {
      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          toast.success("Post updated");
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          data.featuredImage = file.$id;
          const dbPost = await appwriteService.createPost({
            ...data,
            Userid: userData?.$id,
          });
          if (dbPost) {
            toast.success('Post created');
            navigate(`/post/${dbPost.$id}`);
          } else {
            toast.error('Post creation failed.');
          }
        }
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setAiLoading(false);
      setAiLoadingMessage('');
    }
  };

  const handleAIBlogDraft = async () => {
    const topic = getValues("title");
    if (!topic) return toast.error("Enter a title first");
    setAiLoading(true);
    setAiLoadingMessage("✍️ Generating blog with AI...");
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language: selectedLang }),
      });
      const data = await res.json();
      setValue("Content", data.blog, { shouldValidate: true });
      toast.success("AI blog draft generated!");
    } catch (err) {
      toast.error("Failed to generate blog");
    } finally {
      setAiLoading(false);
      setAiLoadingMessage('');
    }
  };

  const handleOutline = async () => {
    const topic = getValues("title");
    if (!topic) return toast.error("Enter a title first");
    setAiLoading(true);
    setAiLoadingMessage("📑 Creating outline using AI...");
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/generate-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, targetLang: selectedLang }),
      });
      const data = await res.json();
      setValue("Content", data.outline, { shouldValidate: true });
      toast.success("Blog outline generated!");
    } catch (err) {
      toast.error("Outline generation failed");
    } finally {
      setAiLoading(false);
      setAiLoadingMessage('');
    }
  };

  const handleTitleSuggestions = async () => {
    const topic = getValues("title");
    if (!topic) return toast.error("Enter a title first");
    setAiLoading(true);
    setAiLoadingMessage("🎯 Fetching AI-generated title suggestions...");
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/suggest-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, targetLang: selectedLang }),
      });
      const data = await res.json();
      if (Array.isArray(data.titles)) {
        setTitleSuggestions(data.titles);
        toast.success("Title suggestions ready!");
      }
    } catch (err) {
      toast.error("Title suggestions failed");
    } finally {
      setAiLoading(false);
      setAiLoadingMessage('');
    }
  };

  const handleRetone = async () => {
    const content = getValues("Content");
    if (!content) return toast.error("Write content first");
    setAiLoading(true);
    setAiLoadingMessage("🗣️ Changing tone with AI...");
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/retone-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogContent: content, tone: selectedTone }),
      });
      const data = await res.json();
      setValue("Content", data.rewritten, { shouldValidate: true });
      toast.success("Content tone changed!");
    } catch (err) {
      toast.error("Tone adjustment failed");
    } finally {
      setAiLoading(false);
      setAiLoadingMessage('');
    }
  };

  const handleTitleSelect = (suggestion) => {
    setValue("title", suggestion, { shouldValidate: true });
    setTitleSuggestions([]);
  };

  return (
    <div className="relative min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto border border-zinc-800 bg-zinc-900 rounded-2xl shadow-xl p-8 mt-16">
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 space-y-4">
            <Input
              label="Title :"
              placeholder="Title"
              className="bg-zinc-800 text-white border-zinc-700"
              {...register('title', { required: true })}
            />
            {titleSuggestions.length > 0 && (
              <div className="bg-zinc-800 rounded-md p-3">
                <p className="text-sm text-zinc-400 mb-1">Suggestions:</p>
                <ul className="space-y-1">
                  {titleSuggestions.map((title, index) => (
                    <li
                      key={index}
                      onClick={() => handleTitleSelect(title)}
                      className="cursor-pointer hover:text-indigo-400 text-sm"
                    >
                      • {title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Input
              label="Slug :"
              placeholder="slug"
              className="bg-zinc-800 text-white border-zinc-700"
              {...register('slug', { required: true })}
              onInput={(e) => {
                setValue('slug', Slugtransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            <RTE
              label="Content :"
              name="Content"
              control={control}
              defaultValue={getValues('Content')}
            />

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                onClick={handleAIBlogDraft}
                disabled={aiLoading}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                ✍️ AI Draft
              </button>
              <button
                type="button"
                onClick={handleOutline}
                disabled={aiLoading}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                📑 AI Outline
              </button>
              <button
                type="button"
                onClick={handleTitleSuggestions}
                disabled={aiLoading}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                🎯 Title Suggestions
              </button>
              <button
                type="button"
                onClick={handleRetone}
                disabled={aiLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                🗣️ Change Tone
              </button>

              <select
                className="bg-zinc-800 text-white px-3 py-1 rounded border border-zinc-700"
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
              >
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="funny">Funny</option>
                <option value="persuasive">Persuasive</option>
              </select>

              <select
                className="bg-zinc-800 text-white px-3 py-1 rounded border border-zinc-700"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            {aiLoading && (
              <div className="mt-4">
                <Loader message={aiLoadingMessage} />
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3 space-y-4">
            <Input
              label="Featured Image :"
              type="file"
              className="bg-zinc-800 text-white border-zinc-700"
              accept="image/*"
              {...register('image', { required: !post })}
            />
            {post && (
              <div>
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={['active', 'inactive']}
              label="Status"
              className="bg-zinc-800 text-white border-zinc-700"
              {...register('status', { required: true })}
            />
            <Button
              type="submit"
              disabled={!isValid || aiLoading}
              className={`
                w-full px-6 py-3 text-white font-semibold rounded-xl transition duration-300 ease-in-out
                ${post ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-md hover:shadow-lg
              `}
            >
              {aiLoading && aiLoadingMessage.includes("post") ? (
                <div className="flex gap-2 items-center justify-center">
                  <div className="animate-spin h-5 w-5 rounded-full border-2 border-t-transparent border-white"></div>
                  <span>{aiLoadingMessage}</span>
                </div>
              ) : post ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postform1;
