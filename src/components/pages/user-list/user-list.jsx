import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormInput, Popup, Table } from 'src/components/atom/index'
import { USERS } from 'src/components/Constant/constant'
import { Delete } from 'src/components/molecule/delete-form/delete-form'
import { useToast } from 'src/context/toast-context'
import { fetchUsers } from 'src/redux/slices/userSlice'
import { dispatch } from 'src/redux/store/store'
import adminService from 'src/services/admin-service'

import { USERS_COLUMNS } from './columns'
import { Edit } from './edit'

import './user-list.css'

export const UserList = () => {
	const [selectedRole, setSelectedRole] = useState('All')
	const [selectedRow, setSelectedRow] = useState(null)
	const [content, setContent] = useState(null)
	const { showToast } = useToast()

	const users = useSelector((state) => {
		return state.users.users
	})

	const filterUsersByRole = (role) =>
		role === 'All' ? users : users.filter((user) => user.userrole === role)

	const handleChangeRole = (e) => {
		setSelectedRole(e.target.value)
	}

	useEffect(() => {
		dispatch(fetchUsers())
	}, [selectedRole])

	const filteredUsers = filterUsersByRole(selectedRole)

	const handleEdit = (row) => {
		setSelectedRow(row)
		setContent('edit')
	}
	const handleDelete = (row) => {
		if (row.userrole === 'Admin') {
			setSelectedRow(null)
			showToast('Cannot Delete Admin', 'decline')
			setContent(null)
		} else {
			setSelectedRow(row.id)
			setContent('delete')
		}
	}

	const confirmDelete = async () => {
		try {
			const response = await adminService.deleteUser(selectedRow)
			await dispatch(fetchUsers())
			showToast(response, 'success')
			setContent(null)
		} catch (error) {
			showToast('unable to Delete User', 'success')
		}
	}

	const contents = {
		edit: <Edit selectedRow={selectedRow} />,
		delete: (
			<Delete handleDelete={confirmDelete} onClose={() => setContent(null)} />
		)
	}
	return (
		<>
			<div className="userList">
				<div className="select-users">
					<FormInput
						label="Select Users"
						valuekey="value"
						optionValue="value"
						type="select"
						onChange={handleChangeRole}
						options={USERS}
					/>
				</div>
				<div className="container">
					{filteredUsers && (
						<Table
							columns={USERS_COLUMNS(handleEdit, handleDelete)}
							data={filteredUsers}
						/>
					)}
				</div>
				<Popup content={contents[content]} onClose={() => setContent(null)} />
			</div>
		</>
	)
}
