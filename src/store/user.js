/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-22 11:33:47
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-27 16:05:25
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null }),
      isLoggedIn: () => !!get().token,
      isAdmin: () => !!get().user && get().user.isAdmin,
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage), // 默认就是localStorage，可以更改为'sessionStorage'或者cookie
    },
  ),
)

export default userStore
