import { createRouter, createWebHistory } from 'vue-router'

const routes = [

	{
		path: '/register',
		name: 'Register',
		component: () => import("@/views/Register.vue")
	},

	{
		path: '/signup',
		name: 'Signup',
		component: () => import("@/views/Signup.vue"),
		props: route => ({ token: route.query.token })
	},

	{
		path: '/login',
		name: 'Login',
		component: () => import("@/views/Login.vue")
	},

	{
		path: '/',
		name: 'Body',
		component: () => import("@/views/HomeView.vue")
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
