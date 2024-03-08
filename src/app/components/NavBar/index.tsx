"use client";
import {Flex, Text} from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation';
import React, {ReactElement, useState} from 'react'

import CartIcon from '../Cart';
import {AppstoreAddOutlined, AppstoreOutlined, HomeOutlined} from "@ant-design/icons";
import {Button} from "antd";

const Navbar = () => {
    const pathname = usePathname();
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    // let s: never = "";
    // s = 1;

    const routers: Record<string, string | ReactElement>[] = [
        // { label: "主页", url: "/" },
        {label: "点菜", url: "/menu", icon: <HomeOutlined/>},
        {label: "菜谱", url: "/recipes", icon: <AppstoreOutlined/>},
        {label: "新菜谱", url: "/admin/cuisine/new", icon: <AppstoreAddOutlined/>}
    ];
    return (
        <nav className="px-5">
            <Flex align={"center"} justify={"between"}>
                <Flex align={"center"} gap={"4"}>
                    <Link href={"/"}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}>
                        {isHovering ? (
                                <Image
                                    className={"rounded-full transition"}
                                    width={64} height={64}
                                    src={"/logo.png"} alt={"nav-logo"}>
                                </Image>) :
                            (<Image
                                className={"rounded-full transition"}
                                width={64} height={64}
                                src={"/logo_tr.png"} alt={"nav-logo"}>
                            </Image>)}
                    </Link>
                    {routers.map(router => (
                        <Link key={router.url as string} href={router.url as string}>
                            <Button type={"text"} size={`${router.url === pathname ? "large" : "middle"}`}>
                                <Text>
                                    {router.icon}
                                </Text>
                            </Button>
                        </Link>
                    ))}
                </Flex>
                <Flex>
                    <CartIcon/>
                </Flex>
            </Flex>
        </nav>
    )
}

export default Navbar
