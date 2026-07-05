
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/api'

const API_URL = `${API_BASE_URL}/api/jobs`

const initialState = {
  jobs: [],
  myJobs: [],
  myApplications: [],
  loading: false,
  error: null,
}

export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async (keyword = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?keyword=${keyword}`)
      return response.data.jobs
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs')
    }
  }
)

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post(`${API_URL}`, jobData, config)
      return response.data.job
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create job')
    }
  }
)

export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async (jobId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post(`${API_URL}/${jobId}/apply`, {}, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to apply for job')
    }
  }
)

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = jobSlice.actions
export default jobSlice.reducer
