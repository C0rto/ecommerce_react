import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h5 style={{ padding: '0 0.3rem', fontSize: '.65rem' }}>
          <Link style={{ padding: '0 0.3rem', fontSize: '1.3rem' }} to="/">
            Home
          </Link>
          {product && (
            <Link
              to="/products"
              style={{ padding: '0 0.3rem', fontSize: '1.1rem' }}
            >
              / Products
            </Link>
          )}
          / {title}
        </h5>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
