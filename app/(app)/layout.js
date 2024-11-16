import { SidebarApp } from "../componenets/ui/sidebarApp"
 
export default function Layout({ children }) {
  return (
    <>
    <SidebarApp>
      <main>{children}</main>

    </SidebarApp>
    
    </>
  )
}