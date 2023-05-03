import { ref } from 'vue'
import { USER_PERMISSIONS } from '@/modules/permissions.constants.js'
import { useAppFetch } from '@/modules/http/useAppFetch.js'

const createService = async () => {
  const userPermissions = ref(null)

  const fetchUserPermissions = async () => {
    if (userPermissions.value) return

    const { data } = await useAppFetch()
  }

  if (data) {
    userPermissions.value = data?.permissions || null
  }

  const checkUserPermission = (permissions) => {
    if (!userPermissions.value) return false
    return userPermissions.value.some(permission => permissions.includes(permission))
  }

  return {
    fetchUserPermissions,
    checkUserPermission
  }
}

const useService = () => {
  let singletonService
  if (!singletonService) singletonService = createService()
  return singletonService
}

export { useService as useAuthenticateService }
