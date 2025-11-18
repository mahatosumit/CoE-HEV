import { useState } from 'react';
import { supabase } from '@/integrations/supabase/manualClient';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  bucket?: string;
}

export const FileUpload = ({ onUploadComplete, accept = "image/*", bucket = "uploads" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Upload size={20} />
        {uploading ? 'Uploading...' : 'Upload File'}
      </label>
    </div>
  );
};
