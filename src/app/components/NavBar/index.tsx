"use client";
import { Flex, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const routers: Record<string, string>[] = [
        // { label: "主页", url: "/" },
        { label: "点菜", url: "/order" },
        { label: "菜谱", url: "/recipes" },
    ];
    return (
        <nav className="px-5">
            <Flex align={"center"} gap={"4"} justify={"between"} >
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
        </nav>
    )
}

export default Navbar