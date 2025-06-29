import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Post() {
  const [post, setPost] = useState(null);
  const [summary, setSummary] = useState("");
  const [questions, setQuestions] = useState([]);
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("hi");

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.Auth.userData);
  const isAuthor = post && userData ? post.Userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (post) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.Content }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Summary error:", err);
    }
    setLoading(false);
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.Content }),
      });
      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      console.error("Questions error:", err);
    }
    setLoading(false);
  };

  const translateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-blogsite.onrender.com/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.Content, targetLang }),
      });
      const data = await res.json();
      setTranslated(data.translated);
    } catch (err) {
      console.error("Translate error:", err);
    }
    setLoading(false);
  };

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 font-sans">
      {/* Featured Image */}
      <div className="relative max-w-5xl mx-auto mb-12 group">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-2xl w-full mt-24 max-h-[520px] object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
        {isAuthor && (
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <Link to={`/edit-post/${post.$id}`}>
              <Button variant="contained" color="success">Edit</Button>
            </Link>
            <Button variant="contained" color="error" onClick={deletePost}>Delete</Button>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        {post.title}
      </h1>

      <div className="w-40 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mx-auto mb-10 animate-pulse"></div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-blue-200 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 text-lg leading-relaxed tracking-wide">
        {typeof post.Content === "string" ? parse(post.Content) : <p>No content available.</p>}
      </div>

      {/* AI Buttons */}
      <div className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-4 justify-center items-center">
        <Button variant="outlined" color="primary" onClick={generateSummary} disabled={loading}>
          🔍 Generate Summary
        </Button>
        <Button variant="outlined" color="secondary" onClick={generateQuestions} disabled={loading}>
          💭 Generate Questions
        </Button>

        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="lang-select-label" style={{ color: "white" }}>Language</InputLabel>
          <Select
            labelId="lang-select-label"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{ color: "white" }}
          >
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="gu">Gujarati</MenuItem>
            <MenuItem value="mr">Marathi</MenuItem>
            <MenuItem value="ta">Tamil</MenuItem>
            <MenuItem value="bn">Bengali</MenuItem>
            <MenuItem value="te">Telugu</MenuItem>
            <MenuItem value="kn">Kannada</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="zh-cn">Chinese</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" color="info" onClick={translateContent} disabled={loading}>
          🌐 Translate
        </Button>
      </div>

      {/* AI Output Sections */}
      <div className="max-w-4xl mx-auto mt-8 space-y-6 text-blue-100">
        {summary && (
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold mb-2 text-fuchsia-300">📝 Summary:</h2>
            <p>{summary}</p>
          </div>
        )}

        {questions.length > 0 && (
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold mb-2 text-green-300">❓ Questions:</h2>
            <ul className="list-disc list-inside space-y-1">
              {questions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        )}

        {translated && (
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold mb-2 text-yellow-300">🌐 Translation:</h2>
            <p>{translated}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center text-white text-xl mt-32">Loading...</div>
  );
}
