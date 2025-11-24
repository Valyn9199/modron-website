"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LogOut, Server, Zap, Activity, TrendingUp, Settings, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('modron_logged_in') === 'true'
    const email = localStorage.getItem('modron_user_email') || ''
    
    if (!loggedIn) {
      router.push('/')
      return
    }
    
    setIsLoggedIn(true)
    setUserEmail(email)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('modron_logged_in')
    localStorage.removeItem('modron_user_email')
    router.push('/')
  }

  if (!isLoggedIn) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-[#4A4A4A] bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/Modron_logo.png"
                alt="MODRON"
                width={96}
                height={32}
                className="h-8 w-auto sm:h-10 object-contain"
              />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden sm:block">{userEmail}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-[#4A4A4A] text-gray-300 hover:text-white hover:bg-[#d5aaf9]/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Monitor your AI infrastructure.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#32ca73]/10 rounded-lg">
                <Server className="h-6 w-6 text-[#32ca73]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">12</h3>
            <p className="text-gray-400 text-sm">Active GPU Clusters</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#40d0f2]/10 rounded-lg">
                <Zap className="h-6 w-6 text-[#40d0f2]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2.4 PetaFLOPS</h3>
            <p className="text-gray-400 text-sm">Total Compute Power</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#d5aaf9]/10 rounded-lg">
                <Activity className="h-6 w-6 text-[#d5aaf9]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">98.5%</h3>
            <p className="text-gray-400 text-sm">Uptime</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#fbff52]/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#fbff52]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
            <p className="text-gray-400 text-sm">Renewable Energy</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b border-[#4A4A4A] last:border-0">
                  <div className="w-10 h-10 bg-[#32ca73]/10 rounded-full flex items-center justify-center">
                    <Server className="h-5 w-5 text-[#32ca73]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">GPU Cluster #{i} deployed</p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1A1A1A] border border-[#4A4A4A] rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-[#d5aaf9]/10 hover:bg-[#d5aaf9]/20 text-[#d5aaf9] border border-[#d5aaf9]/30">
                <Server className="h-4 w-4 mr-2" />
                Deploy New Cluster
              </Button>
              <Button className="w-full justify-start bg-[#40d0f2]/10 hover:bg-[#40d0f2]/20 text-[#40d0f2] border border-[#40d0f2]/30">
                <Settings className="h-4 w-4 mr-2" />
                Manage Infrastructure
              </Button>
              <Button className="w-full justify-start bg-[#32ca73]/10 hover:bg-[#32ca73]/20 text-[#32ca73] border border-[#32ca73]/30">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

