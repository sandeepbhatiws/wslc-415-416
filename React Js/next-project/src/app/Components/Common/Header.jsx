import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <>
      <ol>
        <li>
          <Link href={`/`}>Home</Link>
        </li>

        <li>
          <Link href={`/about-us`}>About Us</Link>
        </li>

        <li>
          <Link href={`/catalog`}>Catalog</Link>
        </li>
      </ol>
    </>
  )
}
