import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'

export default function Blog({ frontmatter, markdown}) {
  return (
    <div>
      <Head>
        <title>Demo Blog | {frontmatter.title}</title>
      </Head>
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      <hr />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const fileContent = matter(fs.readFileSync(`/home/pablov/Code/streameth/src/content/blogs/${params.id}.md`, 'utf8'))
  let frontmatter = fileContent.data
  const markdown = fileContent.content

  return {
    props: { frontmatter, markdown }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filesInProjects = fs.readdirSync('/home/pablov/Code/streameth/src/content/blogs')

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //   { params: { slug: 'my-first-blog' }},
  //   { params: { slug: 'how-to-train-a-dragon' }},
  //   { params: { slug: 'how-to-catch-a-pokemon' }},
  // ]
  const paths = filesInProjects.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { id: filename }}
  })

  console.log(paths)
  return {
    paths,
    fallback: false // This shows a 404 page if the page is not found
  }
}
