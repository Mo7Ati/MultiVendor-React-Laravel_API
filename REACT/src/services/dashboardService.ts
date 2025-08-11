import { DashboardStats } from '@/types/dashboard-stats';
import axiosClient from '@/axios-client';

export const getPermissions = async () => {
  try {
    const response = await axiosClient.get("/api/admin/dashboard/permissions");
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axiosClient.get(`/api/admin/dashboard/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};
