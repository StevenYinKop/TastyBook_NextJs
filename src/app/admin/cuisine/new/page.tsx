'use client';
import {Button, Flex, Select, TextField, TextFieldInput} from '@radix-ui/themes';
import {ChangeEvent, useState} from 'react'
import {useForm, SubmitHandler, Controller, useFormContext} from "react-hook-form"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewCuisine() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setLoading] = useState(false)
    const [value, setValue] = useState('');
    const {
        register,
        handleSubmit,
        control
    } = useFormContext();

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        // validate file

        // assemble objects

        // fetch post

        // back to main
    }
    const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        debugger;
        const files = e.target.files;
        if (!files) {
            return
        }
        const file = files[0];
        // upload file
        setLoading(true)
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({filename: file.name, contentType: file.type}),
            }
        )

        if (response.ok) {
            const {url, fields} = await response.json()
        }
    }
    const createCuisine = async (data: any) => {

    }

    return (
        <main>
            <div className="p-3 max-w-3xl mx-auto min-h-screen">
                <h1 className="text-center text-3xl my-7 font-semibold">Create a Cuisine</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 sm:flex-row justify-between">
                        <TextField.Root className="w-full">
                            <TextField.Input
                                type="text"
                                placeholder='Title'
                                id='title'
                                required
                                className='sm:flex-1'
                                {...register("title")}
                            ></TextField.Input>
                        </TextField.Root>
                        <Controller
                            control={control}
                            render={({field}) => (
                            <Select.Root
                                {...field}
                                required
                                defaultValue="pork">
                                <Select.Trigger/>
                                <Select.Content position="popper">
                                    <Select.Item value="pork">Pork</Select.Item>
                                    <Select.Item value="steak">Steak</Select.Item>
                                    <Select.Item value="lamb">Lamb</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        )} name={"categories"} />
                    </div>
                    <TextField.Root className="w-full">
                        <TextField.Input
                            type="text"
                            placeholder='Description'
                            id='description'
                            required
                            className='sm:flex-1'
                            {...register("description")}
                        ></TextField.Input>
                    </TextField.Root>
                    <TextField.Root className="w-full">
                        <TextField.Input
                            type="text"
                            placeholder='Link'
                            id='link'
                            {...register("link")}
                            className='sm:flex-1'></TextField.Input>
                    </TextField.Root>
                    <Flex gap="4" align={"center"} justify={"between"}
                          className='border-4 border-teal-500 border-dotted p-3'>
                        <input
                            id="file"
                            type="file"
                            onChange={onFileUpload}
                            accept="image/png, image/jpeg"
                        />
                    </Flex>
                    <Controller
                        control={control}
                        render={({field}) => (<ReactQuill
                            {...field}
                            className="h-64 mb-16"
                            theme="snow" value={value} onChange={setValue}>
                        </ReactQuill>
                    )} name={"detail"}
                                defaultValue={""}/>
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
