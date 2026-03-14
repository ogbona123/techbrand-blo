import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import { 
  Twitter, 
  Linkedin, 
  Link as LinkIcon, 
  MessageCircle, 
  Heart, 
  Share2, 
  ChevronRight, 
  Github,
  Menu,
  X
} from 'lucide-react';
import { POSTS } from './data';

// --- Utility Components ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Dynamic SEO Hook
function useSEO({ title, description, image }: { title: string, description: string, image: string }) {
  useEffect(() => {
    // Update Title
    document.title = `${title} | TechBrand`;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard SEO
    setMetaTag('name', 'description', description);
    
    // Open Graph / Facebook
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    
    // Twitter
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:image', image);

  }, [title, description, image]);
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-xl tracking-tighter text-gray-900">
              TechBrand<span className="text-blue-600">.</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Articles</Link>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Tutorials</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Podcasts</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Articles</Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Tutorials</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Podcasts</a>
        </div>
      )}
    </nav>
  );
};

const ArticleHeader = ({ post }: { post: any }) => {
  return (
    <header className="pt-16 pb-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{post.readTime}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto">
          {post.description}
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <img 
            src={post.author.avatar} 
            alt={`Avatar of ${post.author.name}`} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

const HeroImage = ({ post }: { post: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
    >
      <div className="aspect-[21/9] w-full relative rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={post.image} 
          alt={`Featured image for ${post.title}`} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </motion.div>
  );
};

const ArticleContent = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="prose prose-lg max-w-none">
        <p>
          The integration of Artificial Intelligence (AI) into software development is no longer a futuristic concept—it's happening right now. As machine learning models become more sophisticated, they are fundamentally altering how developers write, test, and deploy code.
        </p>
        
        <h2>The Rise of AI Pair Programmers</h2>
        <p>
          Tools like <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">GitHub Copilot</a> and <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Google's Gemini</a> have introduced the concept of the "AI pair programmer." These assistants don't just autocomplete syntax; they understand context, suggest entire functions, and even write boilerplate code based on natural language comments.
        </p>
        
        <blockquote>
          "AI won't replace developers, but developers who use AI will replace those who don't."
        </blockquote>
        
        <p>
          This shift allows engineers to focus on higher-level architecture and problem-solving rather than getting bogged down in repetitive typing. However, it also introduces new challenges, such as ensuring the generated code is secure and adheres to <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP security best practices</a>.
        </p>

        <h3>Example: Generating a React Component</h3>
        <p>
          Consider how easily an AI can generate a functional <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a> component. Instead of writing the state management and JSX from scratch, a developer can simply prompt the AI:
        </p>

        <pre><code>{`// Prompt: Create a counter component with Tailwind CSS styling
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg shadow-sm text-center">
      <h3 className="text-lg font-medium mb-4">Count: {count}</h3>
      <div className="space-x-2">
        <button 
          onClick={() => setCount(c => c - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Increment
        </button>
      </div>
    </div>
  );
}`}</code></pre>

        <h2>Intelligent Testing and Debugging</h2>
        <p>
          Beyond writing code, AI is revolutionizing Quality Assurance. Traditional testing requires developers to anticipate edge cases and write exhaustive test suites. Modern AI tools can analyze a codebase, identify potential vulnerabilities, and automatically generate unit tests.
        </p>
        
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" 
          alt="Close up of computer screen displaying programming code" 
          referrerPolicy="no-referrer"
        />

        <ul>
          <li><strong>Automated Test Generation:</strong> Creating comprehensive test coverage in seconds.</li>
          <li><strong>Predictive Bug Detection:</strong> Identifying patterns that typically lead to runtime errors before the code is even merged.</li>
          <li><strong>Automated Refactoring:</strong> Suggesting cleaner, more efficient ways to structure existing code.</li>
        </ul>

        <h2>The Human Element Remains Crucial</h2>
        <p>
          Despite these advancements, the role of the software engineer is not diminishing; it is evolving. AI models are incredibly powerful pattern matchers, but they lack true understanding, creativity, and business context.
        </p>
        <p>
          The future belongs to the "AI-augmented engineer"—a professional who leverages these tools to accelerate development while applying human judgment to architecture, user experience, and ethical considerations.
        </p>
      </div>

      {/* Tags and Share */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#ArtificialIntelligence</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#SoftwareEngineering</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#FutureOfWork</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-500 mr-2">Share:</span>
          <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors" aria-label="Share on Twitter">
            <Twitter size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors" aria-label="Share on LinkedIn">
            <Linkedin size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy Link">
            <LinkIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthorBio = ({ post }: { post: any }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img 
          src={post.author.avatar} 
          alt={`Profile picture of ${post.author.name}`} 
          className="w-24 h-24 rounded-full object-cover shadow-sm"
          referrerPolicy="no-referrer"
        />
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author.name}</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {post.author.bio}
          </p>
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label={`${post.author.name}'s Twitter`}>
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label={`${post.author.name}'s GitHub`}>
              <Github size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label={`${post.author.name}'s LinkedIn`}>
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        <div className="hidden sm:block">
          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentsSection = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
        <MessageCircle className="mr-3 text-gray-400" />
        Discussion (3)
      </h3>
      
      {/* Comment Form */}
      <div className="mb-10 flex gap-4">
        <div className="hidden sm:block flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            U
          </div>
        </div>
        <div className="flex-1">
          <form className="space-y-4">
            <div>
              <label htmlFor="comment" className="sr-only">Add a comment</label>
              <textarea 
                id="comment" 
                rows={3} 
                className="w-full rounded-xl border-gray-200 border p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                placeholder="What are your thoughts on this topic?"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {[
          {
            name: "Alex Rivera",
            date: "2 hours ago",
            avatar: "https://picsum.photos/seed/alex/100/100",
            content: "Great article! I've been following this space for a few months now, and it's definitely changing how I approach my daily work.",
            likes: 12
          },
          {
            name: "Priya Patel",
            date: "5 hours ago",
            avatar: "https://picsum.photos/seed/priya/100/100",
            content: "I agree that the human element remains crucial. These tools are great, but they still struggle with deep architectural decisions that require business context.",
            likes: 8
          },
          {
            name: "Marcus Johnson",
            date: "1 day ago",
            avatar: "https://picsum.photos/seed/marcus/100/100",
            content: "The examples provided are spot on. It saves so much time on the initial setup, allowing us to focus on the complex logic.",
            likes: 4
          }
        ].map((comment, idx) => (
          <div key={idx} className="flex gap-4">
            <img 
              src={comment.avatar} 
              alt={`Avatar of ${comment.name}`} 
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{comment.name}</span>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                {comment.content}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <button className="flex items-center hover:text-gray-900 transition-colors">
                  <Heart size={14} className="mr-1" /> {comment.likes}
                </button>
                <button className="hover:text-gray-900 transition-colors font-medium">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedPosts = ({ currentSlug }: { currentSlug: string }) => {
  // Filter out the current post and take up to 6 related posts
  const relatedPosts = POSTS.filter(p => p.slug !== currentSlug).slice(0, 6);

  return (
    <div className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Keep Reading</h2>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post, idx) => (
            <Link key={idx} to={`/post/${post.slug}`} className="group block">
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={post.image} 
                  alt={`Thumbnail for ${post.title}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-md shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500">{post.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="font-bold text-xl tracking-tighter text-gray-900">
            TechBrand<span className="text-blue-600">.</span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">© 2026 TechBrand Inc. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="TechBrand Twitter">
            <span className="sr-only">Twitter</span>
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="TechBrand GitHub">
            <span className="sr-only">GitHub</span>
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="TechBrand LinkedIn">
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const BlogPost = () => {
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to={`/post/${POSTS[0].slug}`} replace />;
  }

  // Update SEO Meta Tags dynamically
  useSEO({
    title: post.title,
    description: post.description,
    image: post.image
  });

  return (
    <article>
      <ArticleHeader post={post} />
      <HeroImage post={post} />
      <ArticleContent />
      <AuthorBio post={post} />
      <CommentsSection />
      <RelatedPosts currentSlug={post.slug} />
    </article>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to={`/post/${POSTS[0].slug}`} replace />} />
            <Route path="/post/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

