"use client";
import {Avatar, Box, Card, Flex, IconButton, Text} from '@radix-ui/themes'
import {useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react'
import {PlusIcon} from "@radix-ui/react-icons";
import { AppDispatch } from '../../../lib/store';
import { addIntoCart } from '../../../lib/redux/reducer';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type Category = {
    id: number;
    name: string;
    thumbnail: string;
};

const OrderPage = () => {

    
    const searchParams = useSearchParams();
    const categories: Category[] =
        useQuery<Category[]>({queryKey: ["queryCategories"], queryFn: async () => (await axios.get('/api/categories')).data})
        .data || [];
    const dispatch = useDispatch<AppDispatch>();
    const [activeCategory, setActiveCategory] = useState<Category | undefined>();
    console.log(categories);
    useEffect(() => {
        console.log("useEffect", activeCategory);
        if (activeCategory) {
            console.log(axios.get(`/api/categories/${activeCategory.id}`))
        }
        // useQuery<Category[]>({queryKey: ["queryCuisineByCategor"], queryFn: async () => (await axios.get('/api/categories')).data})
    }, [activeCategory]);
    return (
        <Flex gap="3" className='overflow-y-hidden h-full' direction={{initial: "column", md: "row" }}>
            <Box className="overflow-x-auto md:overflow-y-auto md:w-32 md:h-full">
                <Flex gap="3" direction={{initial: "row", md: "column"}}>
                {categories
                    .map(item =>
                        (
                            <Text
                                onClick={() => setActiveCategory(item)}
                                className={`${activeCategory?.id === item.id ?
                                    "border-l border-t bg-slate-50 initial1`:border-r md:border-b" :
                                    "initial:border-b md:border-r"}
                                    text-lg
                                    cursor-pointer
                                    full-width
                                    text-nowrap
                                    py-1
                                    px-3
                                    md:h-8
                                    md:min-w-4
                                `}
                                key={item.id}>
                                {item.name}
                            </Text>
                        )
                    )
                }
                </Flex>
            </Box>
            <Box grow={"1"} className='overflow-y-auto h-full relative'>
                <Flex gap={"4"} direction={"column"} >
                    {activeCategory && [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(item => (
                        <Card size="3" key={item} className={"w-full"}>
                            <Flex justify={"between"} align={"center"}>
                                <Flex gap="4" align="center">
                                    <Avatar src={"/samples/xiangcainiurou.jpeg"} size="5" fallback="T" color="indigo"/>
                                    <Box>
                                        <Text as="div" size="4" weight="bold">
                                            {activeCategory?.name} + {item}
                                        </Text>
                                        <Text as="div" size="4" color="gray">
                                            {`${activeCategory?.name}的配菜们。。。。。。`}
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex gap={"4"} justify={"between"} align={"center"}>
                                    <Button onClick={() => dispatch(addIntoCart(item))} shape="circle" icon={<PlusIcon width="22" height="22" />} />
                                    {/* <IconButton onClick={() => dispatch(addIntoCart(item))} size="3" variant="soft"> */}
                                    {/* </IconButton> */}
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Box>
        </Flex>
    )
}

export default OrderPage
