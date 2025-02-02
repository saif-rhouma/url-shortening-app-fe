import { useEffect, useState } from 'react';

const LoadingAnimation = ({ text }: { text: string }) => {
  const [content, setContent] = useState(text);
  useEffect(() => {
    setContent(text);
  }, [text]);

  return (
    <div className="loader">
      <span>{content}</span>
    </div>
  );
};
export default LoadingAnimation;
