import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import("@/views/HomeView.vue")
	},

	{
		path: '/register',
		name: 'Register',
		component: () => import("@/views/Register.vue")
	},

	{
		path: '/signup',
		name: 'Signup',
		component: () => import("@/views/Signup.vue")
	},

	{
		path: '/login',
		name: 'Login',
		component: () => import("@/views/Login.vue")
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
