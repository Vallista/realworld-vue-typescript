import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import Article from '../pages/article/Article.vue'
import CreateArticle from '../pages/article/CreateArticle.vue'
import EditArticle from '../pages/article/EditArticle.vue'
import Login from '../pages/login/Login.vue'
import SignUp from '../pages/login/SignUp.vue'
import Setting from '../pages/setting/Setting.vue'
import Profile from '../pages/profile/Profile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: SignUp,
    },
    {
        path: '/article',
        component: Article,
    },
    {
        path: '/edit-article',
        component: EditArticle,
    },
    {
        path: '/create-article',
        component: CreateArticle,
    },
    {
        path: '/setting',
        component: Setting,
    },
    {
        path: '/profile',
        component: Profile,
    },
]

const router = new VueRouter({
    routes
})

export default router
