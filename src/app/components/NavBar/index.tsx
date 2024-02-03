"use client";
import {Box, Flex, IconButton, Text} from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation';
import React, {useState} from 'react'
import {ArchiveIcon} from "@radix-ui/react-icons";
import {useAppStore} from "../../../../lib/hook";

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const routers: Record<string, string>[] = [
        // { label: "主页", url: "/" },
        {label: "点菜", url: "/order"},
        {label: "菜谱", url: "/recipes"},
    ];
    const appStore = useAppStore()
    console.log(appStore)
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
                        <Link key={router.url} href={router.url}>
                            <Text className={`${router.url === pathname ? "font-bold" : "font-normal"}`}>
                                {router.label}
                            </Text>
                        </Link>
                    ))}
                </Flex>
                <Flex>
                    <IconButton size={"3"} radius="full" variant="soft" color={"pink"} >
                        <ArchiveIcon
                            width="22"
                            height="22"/>
                    </IconButton>
                </Flex>
            </Flex>
        </nav>
    )
}

export default Navbar
