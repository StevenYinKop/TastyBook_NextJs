"use client";
import {Avatar, Box, Card, Flex, IconButton, Text} from '@radix-ui/themes'
import {useSearchParams} from 'next/navigation';
import React, {useState} from 'react'
import {PlusIcon} from "@radix-ui/react-icons";
import { AppDispatch } from '../../../lib/store';
import { addIntoCart } from '../../../lib/redux/reducer';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

export type Category = {
    id: number;
    category: string;
};

const OrderPage = () => {
    const searchParams = useSearchParams();
    const categories: Category[] = [
        {id: 0, category: "猪肉🐷"},
        {id: 1, category: "羊肉🐑"},
        {id: 2, category: "鸡肉🐔"},
        {id: 3, category: "虾🦐"},
        {id: 4, category: "白菜🥬"},
        {id: 5, category: "西兰花🥦"},
        {id: 6, category: "金针菇🍄"},
        {id: 7, category: "方便面🍜"}
    ];
    const dispatch = useDispatch<AppDispatch>();
    const [activeCategory, setActiveCategory] = useState<Category | undefined>({id: 1, category: "猪肉"});
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
                                    "border-l border-t border-b bg-slate-50" :
                                    "border-r"}
                                    py-1 px-3
                                    text-lg
                                    cursor-pointer
                                    full-width
                                    w-full
                                    md:h-8
                                    md:min-w-4
                                `}
                                key={item.id}>
                                {item.category}
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
                                            {activeCategory?.category} + {item}
                                        </Text>
                                        <Text as="div" size="4" color="gray">
                                            {`${activeCategory?.category}的配菜们。。。。。。`}
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
