import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo.svg'
import AMGeOLogo from '../../static/AMGeO-Logo.svg'

import classes from '../styles/index.module.sass'

export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata
    const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
    }))
    return (
        <Layout isHome>
            <Logo className={classes.logo} aria-label={siteMetadata.title} />
            <section>

                <h1 className={classes.subtitle}><center>Welcome to AMGeO/EarthCube Interactive Workshop!</center></h1>
                <div className={classes.introduction}>
                <p></p>

                <center>
                    <p>
                        These short courses will teach you how to conduct reproducible 
                        research using Data Sciences tools.  

                        You will be working with Python, Jupyter, AMGeO and other popular 
                        Python packages.

                    </p>
                    <p>
                        After these modules, you will be prepared to work with others 
                        using Python for the AMGeO Earthcube Workshop. 
                    </p>
                    <p>
                        This page runs on a python3 kernel.

                        These materials are built on top of the great work provided by Earthcube 
                        in this repo: https://github.com/throughput-ec/ec_workshops_py

                    </p>
                </center>
                </div>
            </section>
            {chapters.map(({ slug, title, description }) => (
                <section key={slug} className={classes.chapter}>
                    <h2 className={classes.chapterTitle}>
                        <Link hidden to={slug}>
                            {title}
                        </Link>
                    </h2>
                    <p className={classes.chapterDesc}>
                        <Link hidden to={slug}>
                            {description}
                        </Link>
                    </p>
                </section>
            ))}
        </Layout>
    )
}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`
