import { ArchiveIcon } from '@radix-ui/react-icons'
import { Avatar, Badge } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../../lib/store';
import Link from 'next/link';

const CartIcon = () => {
  const cuisineList = useAppSelector((state) => state.value.cuisineList);
  return (
    <Link href={"/order"}>
      <Badge count={cuisineList.length} >
        <Avatar size="large" icon={<ArchiveIcon />} />
      </Badge>
    </Link>
  )
}

export default CartIcon
