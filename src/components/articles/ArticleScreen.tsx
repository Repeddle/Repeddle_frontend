/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadingBox from '../LoadingBox';


const ArticleScreen: React.FC = () => {
 const { id: articleId } = useParams<{ id: string }>();
 const [article, setArticle] = useState<any>(null);
 const [searchTerm, setSearchTerm] = useState('');
 const navigate = useNavigate();
 const [mode, setMode] = useState('pagebodylight');

 useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${articleId}`);
        setArticle(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticle();
 }, [articleId]);

 if (!article) {
    return <LoadingBox />;
 }

 const renderContent = () => {
    let renderedContent = [];
    let isLinkCombined = false;

    for (let i = 0; i < article.content.length; i++) {
      const item = article.content[i];

      if (item.type === 'paragraph') {
        if (isLinkCombined) {
          isLinkCombined = false;
          continue;
        }
        renderedContent.push(<p key={i}>{item.content}</p>);
      } else if (item.type === 'link') {
        let linkContent = item.content;
        const prevItem = article.content[i - 1];
        const nextItem = article.content[i + 1];
        if (
          prevItem &&
          prevItem.type === 'paragraph' &&
          nextItem &&
          nextItem.type === 'paragraph'
        ) {
          isLinkCombined = true;
          renderedContent[renderedContent.length - 1] = (
            <p key={i}>
              {prevItem.content}{' '}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {linkContent}
              </a>{' '}
              {nextItem.content}
            </p>
          );
        } else if (
          prevItem &&
          prevItem.type === 'paragraph' &&
          nextItem &&
          nextItem.type !== 'paragraph'
        ) {
          renderedContent[renderedContent.length - 1] = (
            <p key={i}>
              {prevItem.content}{' '}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {linkContent}
              </a>
            </p>
          );
        } else {
          renderedContent.push(
            <p key={i}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {linkContent}
              </a>
            </p>
          );
        }
      } else if (item.type === 'image') {
        renderedContent.push(<img key={i} src={item.content} alt={item.id} />);
      }
    }

    return renderedContent;
 };

 const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    var key = e.keyCode || e.which;
    if (key === 13) {
      e.currentTarget.blur();
      navigate(`/articles?search=${searchTerm}`);
    }
 };

 return (
    <div className="max-w-2xl mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="text-sm">
          <Link to="/" className="text-orange-500 hover:underline">Home</Link> / <Link to="/articles" className="text-orange-500 hover:underline">Articles</Link> / {article.topic}
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-72">
          <FontAwesomeIcon icon={faSearch} className="m-2" />
          <input
            className={`w-full p-2 border-none ${mode === 'pagebodylight' ? 'text-black' : 'text-white'}`}
            type="search"
            placeholder="Search articles"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center mb-5">{article.question}</h1>
      <div className="text-lg leading-6 text-center">
        {renderContent()}
      </div>
    </div>
 );
};

export default ArticleScreen;
