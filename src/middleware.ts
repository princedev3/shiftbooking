import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectRoute =  createRouteMatcher(["/"])

export default clerkMiddleware((auth,req)=>{
    if(isProtectRoute(req)) auth().protect()
})

export const config = {
  matcher: [
  
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 
    '/(api|trpc)(.*)',
  ],
}