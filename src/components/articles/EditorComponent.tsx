import React, { Key, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParagraph, faLink, faImage, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

type ContentItem =
 | { type: "paragraph"; content: string; id: number }
 | {
     [x: string]: Key | null | undefined; type: "link"; content: string; url: string 
}
 | { type: "image"; content: string };

const EditorComponent = () => {
    const [content, setContent] = useState<ContentItem[]>([
        { type: "paragraph", content: "", id: 1 },
    ]);

 const handleAddParagraph = () => {
    const newContent = [...content];
    newContent.push({ type: "paragraph", content: "", id: newContent.length + 1 });
    setContent(newContent);
 };

 const handleAddLink = () => {
    const newContent = [...content];
    newContent.push({ type: "link", content: "", url: "" });
    setContent(newContent);
 };

 const handleAddImage = () => {
    const newContent = [...content];
    newContent.push({ type: "image", content: "" });
    setContent(newContent);
 };
  const renderContent = () => {
    return content.map((item) => {
      if (item.type === "paragraph") {
        return <textarea key={item.id} placeholder="Start typing" />;
      }
      if (item.type === "link") {
        return (
          <div key={item.id}>
            <a href={item.url}>{item.content}</a>
            <FontAwesomeIcon icon={faEdit} />
            <FontAwesomeIcon icon={faTrash} />
          </div>
        );
      }
      if (item.type === "image") {
        return <img src={item.content} alt="Preview" />;
      }
      return null;
    });
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h2>Question</h2>
        {renderContent()}
      </div>

      <div className="button-container">
        <button onClick={handleAddParagraph}>
          <FontAwesomeIcon icon={faParagraph} /> Add Paragraph
        </button>
        <button onClick={handleAddLink}>
          <FontAwesomeIcon icon={faLink} /> Add Link
        </button>
        <button onClick={handleAddImage}>
          <FontAwesomeIcon icon={faImage} /> Add Image
        </button>
      </div>

      <div>
        <button>Create Article</button>
      </div>
    </div>
  );
};

export default EditorComponent;
