import React, { useEffect, useState } from 'react';
import styles from "../../styles/Dashboard/TagInputBox.module.css";

interface TagInputBoxProps {
  type: string,
  placeholder: string,
  setAllTags?: (tags: string[]) => void,
}

const TagInputBox: React.FC<TagInputBoxProps> = ({ type, placeholder, setAllTags}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (setAllTags) {
      setAllTags(tags);
    }
  }, [tags, setAllTags]);

  return (
    <div className={styles.tagInputBox}>
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            <div style={{display: 'flex', gap: '8px'}}>
              <div className={styles.icon}>{tag.split(" ")[0].charAt(0).toUpperCase()}</div>
              {tag}
            </div>
            <span className={styles.removeTag} onClick={() => handleRemoveTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagInputBox;