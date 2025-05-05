<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <WelcomeMessage description="Let's make today productive!" />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/store-icon.svg" alt="stores icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ adminStats?.store_count || 0 }} stores</h2>
          <p class="text-sm text-gray-500">Total active stores</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/client-icon.svg" alt="clients icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ adminStats?.store_owner_count || 0 }} store owners</h2>
          <p class="text-sm text-gray-500">Number of store owners</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/revenue-icon.svg" alt="orders icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ adminStats?.order_count || 0 }} orders</h2>
          <p class="text-sm text-gray-500">Total orders</p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-[20px] shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Stores by Type</h2>
        <div class="w-full h-64">
          <canvas ref="storesByTypeChart"></canvas>
          <p v-if="!adminStats?.stores_by_type?.length" class="text-gray-400 text-center mt-8">No data available</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Orders by Store</h2>
        <div class="w-full h-64">
          <canvas ref="ordersByStoreChart"></canvas>
          <p v-if="!adminStats?.orders_by_store?.length" class="text-gray-400 text-center mt-8">No data available</p>
        </div>
      </div>
    </div>
    
    <section class="bg-white rounded-[20px] shadow-sm p-6">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-lg font-semibold text-gray-800">Latest Stores</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-gray-500 border-b border-gray-200">
              <th class="pb-3 pl-3 text-sm font-medium">#</th>
              <th class="pb-3 text-sm font-medium">Store</th>
              <th class="pb-3 text-sm font-medium">Subdomain</th>
              <th class="pb-3 text-sm font-medium">Type</th>
              <th class="pb-3 text-sm font-medium">Status</th>
              <th class="pb-3 text-sm font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(store, index) in adminStats?.latest_stores" :key="store.id" class="border-b border-gray-100">
              <td class="py-3 pl-3 text-sm">{{ index + 1 }}</td>
              <td class="py-3">
                <div class="flex items-center gap-3">
                  <img class="size-10 rounded-full object-cover" src="@/assets/images/customeravatar.svg" alt="store avatar">
                  <div>
                    <p class="font-medium text-gray-800">{{ store.name }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 text-sm text-gray-600">{{ store.subdomain }}</td>
              <td class="py-3 text-sm text-gray-600 capitalize">{{ store.type }}</td>
              <td class="py-3">
                <span class="text-sm font-medium" :class="{
                  'text-[#3D9E84]': store.status === 'active',
                  'text-yellow-500': store.status === 'pending',
                  'text-red-500': store.status === 'inactive'
                }">
                  {{ store.status }}
                </span>
              </td>
              <td class="py-3 text-sm text-gray-600">{{ formatDate(store.created_at) }}</td>
            </tr>
            <tr v-if="!adminStats?.latest_stores?.length">
              <td colspan="6" class="py-4 text-center text-gray-500">No stores found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useStatisticsStore } from '@/stores/statistics'
import { onMounted, computed, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const statisticsStore = useStatisticsStore()
const storesByTypeChart = ref(null)
const ordersByStoreChart = ref(null)

const adminStats = computed(() => statisticsStore.adminStats)

onMounted(() => {
  statisticsStore.getAdminDashboard()
})

watch(adminStats, (newVal) => {
  if (newVal) {
    renderStoresByTypeChart()
    renderOrdersByStoreChart()
  }
}, { deep: true })

const chartColors = {
  primary: '#493D9E',
  dark: '#222222',
  background: '#F5F5F5',
  border: '#E0E0E0',
  accent: '#3D9E84',
  additional: ['#6C5CE7', '#A29BFE', '#FD79A8', '#00CEC9']
}

const renderStoresByTypeChart = () => {
  if (!storesByTypeChart.value || !adminStats.value?.stores_by_type?.length) return
  
  const ctx = storesByTypeChart.value.getContext('2d')
  
  if (storesByTypeChart.value.chart) {
    storesByTypeChart.value.chart.destroy()
  }
  
  const labels = adminStats.value.stores_by_type.map(item => item.type)
  const data = adminStats.value.stores_by_type.map(item => item.total)
  
  storesByTypeChart.value.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          chartColors.primary,
          chartColors.dark,
          ...chartColors.additional
        ],
        borderColor: chartColors.border,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: chartColors.dark,
            font: {
              family: "'Inter', sans-serif",
              size: 12
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: chartColors.dark,
          titleFont: {
            family: "'Inter', sans-serif",
            size: 12
          },
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 12
          },
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.raw || 0
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = Math.round((value / total) * 100)
              return `${label}: ${value} (${percentage}%)`
            }
          }
        }
      },
      cutout: '70%'
    }
  })
}

const renderOrdersByStoreChart = () => {
  if (!ordersByStoreChart.value || !adminStats.value?.orders_by_store?.length) return
  
  const ctx = ordersByStoreChart.value.getContext('2d')
  
  if (ordersByStoreChart.value.chart) {
    ordersByStoreChart.value.chart.destroy()
  }
  
  const labels = adminStats.value.orders_by_store.map(item => item.store)
  const data = adminStats.value.orders_by_store.map(item => item.total)
  
  ordersByStoreChart.value.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Orders',
        data: data,
        backgroundColor: chartColors.primary,
        borderColor: chartColors.dark,
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: chartColors.dark
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: chartColors.dark,
          titleFont: {
            family: "'Inter', sans-serif",
            size: 12
          },
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: chartColors.border,
            drawBorder: false
          },
          ticks: {
            color: chartColors.dark,
            stepSize: 1
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            color: chartColors.dark
          }
        }
      }
    }
  })
}

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>