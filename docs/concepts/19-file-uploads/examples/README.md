# File Upload Examples

This directory contains practical code examples demonstrating file upload handling in Next.js.

## Examples

### 1. Basic File Upload (`01-basic-upload.tsx`)
Demonstrates basic file upload:
- Single file upload
- File validation
- Progress tracking
- Error handling

### 2. Server Actions File Upload (`02-server-actions-upload.tsx`)
Shows file upload with Server Actions:
- FormData handling
- Server-side validation
- File processing
- Storage integration

### 3. Multiple File Upload (`03-multiple-files.tsx`)
Demonstrates multiple file uploads:
- Multiple file selection
- File list management
- Batch upload
- Progress tracking per file

### 4. Image Upload with Preview (`04-image-preview.tsx`)
Shows image upload with preview:
- Image preview
- Image validation
- Image resizing
- Thumbnail generation

### 5. Drag and Drop Upload (`05-drag-drop.tsx`)
Demonstrates drag and drop:
- Drag and drop interface
- File validation
- Visual feedback
- Multiple files

### 6. Complete Example (`06-complete-example.tsx`)
A comprehensive example combining:
- All upload patterns
- Validation
- Progress tracking
- Error handling
- File management

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Set up file storage** (local or cloud)
4. **Run your Next.js app**: `npm run dev`
5. **Test different features**:
   - Upload files
   - Test validation
   - Check progress tracking
   - Verify file storage

## File Storage Options

### Local Storage
- Store files in `public/uploads/` or `uploads/`
- Use `fs` module on server
- Good for development

### Cloud Storage
- AWS S3
- Cloudinary
- Uploadcare
- Vercel Blob Storage

## Key Concepts

### FormData
- Use FormData for file uploads
- Can include both files and text fields
- Automatically sets Content-Type

### File Validation
- Check file type (MIME type)
- Check file size
- Validate file extension
- Sanitize file names

### Progress Tracking
- Use XMLHttpRequest for progress
- Or use fetch with ReadableStream
- Show progress bar to user

### Server Actions
- Perfect for file uploads
- Handle FormData directly
- Process files on server
- Return file URLs

## Best Practices

1. **Always validate on server**: Client validation can be bypassed
2. **Limit file size**: Set reasonable limits
3. **Validate file types**: Whitelist allowed types
4. **Sanitize file names**: Prevent path traversal
5. **Show progress**: Better UX with progress indicators
6. **Handle errors gracefully**: Display user-friendly messages
7. **Store securely**: Use proper storage solution

