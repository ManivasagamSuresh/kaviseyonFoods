// components/Viewer/Viewer.tsx
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ViewerProps {
  desc: string;
}

const Viewer: React.FC<ViewerProps> = ({ desc }) => {
  const [source, setSource] = React.useState<MDXRemoteSerializeResult | null>(null);

  React.useEffect(() => {
    const parseMDX = async () => {
      const mdxSource = await serialize(desc);
      setSource(mdxSource);
    };

    parseMDX();
  }, [desc]);

  if (!source) return <div>Loading...</div>;

  return (
    <div className="prose text-sm">
      <MDXRemote {...source} />
    </div>
  );
};

export default Viewer;
