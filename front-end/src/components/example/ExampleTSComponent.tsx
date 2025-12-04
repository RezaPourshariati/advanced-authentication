import { FC, useState } from 'react'
import type { User } from '@/types'

/**
 * Example TypeScript Component
 * This demonstrates how to write a React component with TypeScript
 */

interface ExampleTSComponentProps {
  user: User
  onUpdate?: (user: User) => void
  className?: string
}

const ExampleTSComponent: FC<ExampleTSComponentProps> = ({ 
  user, 
  onUpdate,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({ ...user, name })
    }
    setIsEditing(false)
  }

  return (
    <div className={`p-4 border rounded ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <h3 className="text-lg font-semibold">{user.name}</h3>
          )}
          <p className="text-gray-600">{user.email}</p>
          <span className={`text-sm px-2 py-1 rounded ${
            user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {user.isVerified ? 'Verified' : 'Not Verified'}
          </span>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExampleTSComponent

