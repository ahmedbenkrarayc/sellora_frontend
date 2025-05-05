<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <WelcomeMessage description="Let's make today productive!" />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/store-icon.svg" alt="orders icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ storeOwnerStats?.order_count || 0 }} orders</h2>
          <p class="text-sm text-gray-500">Total orders</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/revenue-icon.svg" alt="revenue icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">${{ storeOwnerStats?.total_revenue || 0 }}</h2>
          <p class="text-sm text-gray-500">Total revenue</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6 flex items-center gap-4">
        <div class="size-12 bg-gray-100 rounded-full flex items-center justify-center">
          <img class="size-full" src="@/assets/images/product-icon.svg" alt="products icon">
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ storeOwnerStats?.product_count || 0 }} products</h2>
          <p class="text-sm text-gray-500">Total products</p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-[20px] shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Orders by Month</h2>
        <div class="w-full h-64">
          <canvas ref="ordersByMonthChart"></canvas>
          <p v-if="!storeOwnerStats?.orders_by_month?.length" class="text-gray-400 text-center mt-8">No data available</p>
        </div>
      </div>
      
      <div class="bg-white rounded-[20px] shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Revenue by Month</h2>
        <div class="w-full h-64">
          <canvas ref="revenueByMonthChart"></canvas>
          <p v-if="!storeOwnerStats?.revenue_by_month?.length" class="text-gray-400 text-center mt-8">No data available</p>
        </div>
      </div>
    </div>
    
    <section class="bg-white rounded-[20px] shadow-sm p-6">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-lg font-semibold text-gray-800">Latest Orders</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-gray-500 border-b border-gray-200">
              <th class="pb-3 pl-3 text-sm font-medium">#</th>
              <th class="pb-3 text-sm font-medium">Order Details</th>
              <th class="pb-3 text-sm font-medium">Location</th>
              <th class="pb-3 text-sm font-medium">Status</th>
              <th class="pb-3 text-sm font-medium">Amount</th>
              <th class="pb-3 text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in storeOwnerStats?.latest_orders" :key="order.id" class="border-b border-gray-100">
              <td class="py-3 pl-3 text-sm">{{ index + 1 }}</td>
              <td class="py-3">
                <div class="flex items-center gap-3">
                  <div class="size-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <img class="size-6" src="@/assets/images/store-icon.svg" alt="order icon">
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Order #{{ order.id }}</p>
                    <p class="text-xs text-gray-500">{{ order.address }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 text-sm text-gray-600">
                {{ order.city }}, {{ order.country }}
                <p class="text-xs text-gray-500">{{ order.postalcode }}</p>
              </td>
              <td class="py-3">
                <span class="text-sm font-medium" :class="{
                  'text-blue-500': order.status === 'processing',
                  'text-[#3D9E84]': order.status === 'completed',
                  'text-yellow-500': order.status === 'pending',
                  'text-red-500': order.status === 'cancelled'
                }">
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3 text-sm font-medium text-gray-800">${{ order.price }}</td>
              <td class="py-3 text-sm text-gray-600">{{ formatDate(order.created_at) }}</td>
            </tr>
            <tr v-if="!storeOwnerStats?.latest_orders?.length">
              <td colspan="6" class="py-4 text-center text-gray-500">No orders found</td>
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
import { useStoreStore } from '@/stores/store'
import { onMounted, computed, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const statisticsStore = useStatisticsStore()
const storeStore = useStoreStore()
const ordersByMonthChart = ref(null)
const revenueByMonthChart = ref(null)

const storeOwnerStats = computed(() => statisticsStore.storeOwnerStats)
const storeId = computed(() => storeStore.storeData?.id)

// Watch for storeId changes and load data when available
watch(storeId, (newId) => {
  if (newId) {
    statisticsStore.getStoreOwnerDashboard(newId)
  }
}, { immediate: true })

watch(storeOwnerStats, (newVal) => {
  if (newVal) {
    renderOrdersByMonthChart()
    renderRevenueByMonthChart()
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

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const renderOrdersByMonthChart = () => {
  if (!ordersByMonthChart.value || !storeOwnerStats.value?.orders_by_month?.length) return
  
  const ctx = ordersByMonthChart.value.getContext('2d')
  
  if (ordersByMonthChart.value.chart) {
    ordersByMonthChart.value.chart.destroy()
  }
  
  const monthlyData = Array(12).fill(0)
  storeOwnerStats.value.orders_by_month.forEach(item => {
    monthlyData[item.month - 1] = item.total
  })
  
  ordersByMonthChart.value.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthNames,
      datasets: [{
        label: 'Orders',
        data: monthlyData,
        backgroundColor: chartColors.primary + '20',
        borderColor: chartColors.primary,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: chartColors.primary,
        pointRadius: 4,
        pointHoverRadius: 6
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

const renderRevenueByMonthChart = () => {
  if (!revenueByMonthChart.value || !storeOwnerStats.value?.revenue_by_month?.length) return
  
  const ctx = revenueByMonthChart.value.getContext('2d')
  
  if (revenueByMonthChart.value.chart) {
    revenueByMonthChart.value.chart.destroy()
  }
  
  const monthlyData = Array(12).fill(0)
  storeOwnerStats.value.revenue_by_month.forEach(item => {
    monthlyData[item.month - 1] = item.total_revenue
  })
  
  revenueByMonthChart.value.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthNames,
      datasets: [{
        label: 'Revenue',
        data: monthlyData,
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
          callbacks: {
            label: function(context) {
              return '$' + context.raw.toFixed(2)
            }
          },
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
            callback: function(value) {
              return '$' + value
            }
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