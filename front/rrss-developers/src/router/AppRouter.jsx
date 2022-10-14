import { Routes, Route, Navigate } from  'react-router-dom';
import  DeveloperPage  from '../developer/pages/DeveloperPage'
import GitHubPage from '../github/pages/GitHubPage';
import SearchesPage from '../searches/pages/SearchesPage';
import TwitterPage from '../twitter/pages/TwitterPage';
import YoutubePage from '../youtube/pages/YoutubePage';
 

const AppRouter = () => {
  return (
    <Routes>
        <Route path = "/" element={ <DeveloperPage/> }/>
        <Route path = "youtube/*" element={<YoutubePage />} />
        <Route path = "youtube/:developer_id" element={<YoutubePage />} />
        <Route path = "github/*" element={<GitHubPage />} />
        <Route path = "github/:gitHub_id" element={<GitHubPage />} />
        <Route path = "twitter/:twitterId" element={<TwitterPage />} />
        <Route path = "search/" element={<SearchesPage />} />
        <Route path = "*" element={<Navigate to="/" />  }/>
    </Routes>
  )
}

export default AppRouter