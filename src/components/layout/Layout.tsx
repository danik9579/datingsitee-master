import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Home from '../home/Home'
import Login from '../login/Login'
import "./Layout.css";


function Layout() {
  return (
    <section className="layout">
        <BrowserRouter>
          <header className="header">
              <Header/>
          </header>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </main>
          <footer className="footer">
            <Footer/>
          </footer>
        </BrowserRouter>
      </section>
  )
}

export default Layout