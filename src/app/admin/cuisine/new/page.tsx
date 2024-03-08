'use client';
import { Button, Flex, Select, TextField, TextFieldInput } from '@radix-ui/themes';
import {ChangeEvent, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewCuisine() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }
    // upload file
    setUploading(true)
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        createCuisine(await uploadResponse.json());
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }
  const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    debugger;
    const files = e.target.files;
    if (!files) {
      return
    }
    const file = files[0];
    // upload file
    setUploading(true)
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }
    )

    if (response.ok) {
      const { url, fields } = await response.json()
    }
  }
  const createCuisine = async (data: any) => {

  }

  return (
    <main>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a Cuisine</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextField.Root className="w-full">
              <TextField.Input
                type="text"
                placeholder='Title'
                id='title'
                required
                className='sm:flex-1'></TextField.Input>
            </TextField.Root>
            <Select.Root
              required
              defaultValue="apple">
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="orange">Orange</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <TextField.Root className="w-full">
            <TextField.Input
              type="text"
              placeholder='Description'
              id='description'
              required
              className='sm:flex-1'></TextField.Input>
          </TextField.Root>
          <TextField.Root className="w-full">
            <TextField.Input
              type="text"
              placeholder='Link'
              id='description'
              className='sm:flex-1'></TextField.Input>
          </TextField.Root>
          <Flex gap="4" align={"center"} justify={"between"} className='border-4 border-teal-500 border-dotted p-3'>
            <input
              id="file"
              type="file"
              onChange={onFileUpload}
              accept="image/png, image/jpeg"
            />
          </Flex>
          <ReactQuill
            className="h-64 mb-16"
            theme="snow" value={value} onChange={setValue}></ReactQuill>
          <Button
            disabled={uploading}
            type="submit"
            className="cursor-pointer"
            variant="soft"
            color="green">
            Submit
          </Button>
        </form>
      </div>
      {/* <h1>Upload a File to S3</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
            if (files) {
              setFile(files[0])
            }
          }}
          accept="image/png, image/jpeg"
        />
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form> */}
    </main>
  )
}
