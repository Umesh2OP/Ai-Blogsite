import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Store/Store.js/'
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import Authlayout from './components/Authlayout.jsx'
import Signupform from './components/Signupform.jsx'
import Allposts from "./Pages/Allposts.jsx"
import Addpost from "./Pages/Addpost.jsx"
import { RouterProvider } from 'react-router-dom'
import Loginpage1 from './Pages/Loginpage1.jsx'
import Loginform from './components/Loginform.jsx'
import Homepage from './components/Homepage.jsx'
import Post from './components/Post.jsx'
import EditPost from './Pages/EditPost.jsx'
import Aboutus from "./components/Aboutus.jsx"
const router=createBrowserRouter([
   {
      path:'/',
      element:<App/>,
      children:[

         {
            path:"/",
            element:<Homepage/>

         },

      {
         path:'/login',
         element:(
           <Authlayout Authentication={false}>
            <Loginform/>
            
           </Authlayout>
         )
      },

      {
          path:'/signup',
         element:(
           <Authlayout Authentication={false}>
            <Signupform/>
            
            
           </Authlayout>
         )

      },
      {
         path:'/all-posts',
         element:(
           <Authlayout Authentication={true}>
            
               <Allposts/>
            
            
           </Authlayout>
         )
      },

      {
         
         path:'/add-posts',
         element:(
           <Authlayout Authentication={true}>
            
               <Addpost/>
            
            
           </Authlayout>
         )
      },
      {
         
         path:'/edit-post/:slug',
         element:(
           <Authlayout Authentication={true}>
            
               <EditPost/>
            
            
           </Authlayout>
         )
      },
      {
         path:'/post/:slug',
         element:(
           <Authlayout Authentication={true}>
            <Post/>
               
            
            
           </Authlayout>
         )

      },

      {
         path:"/about-us",
         element:<Aboutus/>
      }
   
   
   ]
   }
])

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <RouterProvider router={router} />

    </Provider>,
)
