import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <Link to={`/blog/${props.blog._id}`}>
        <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm w-full">
        {/* Image Container with Overlay Effect */}
        <div className="relative h-56 overflow-hidden bg-gray-200">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src={`http://192.168.1.70:3000/${props.blog.image}`}
            alt={props.blog.title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col grow p-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {props.blog.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-4 grow">
            {props.blog.subtitle}
          </p>
          
          {/* CTA */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group/btn cursor-pointer">
              Read more
              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </article>
      </Link>
    </>
  );
}