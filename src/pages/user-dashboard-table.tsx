import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import './UserDashboardTable.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  department: string;
  joinDate: string;
  lastLogin: string;
}

interface SortConfig {
  key: keyof User | null;
  direction: 'asc' | 'desc' | null;
}

const UserDashboardTable = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'IT', joinDate: '2023-01-15', lastLogin: '2024-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', department: 'HR', joinDate: '2023-02-20', lastLogin: '2024-01-19' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', department: 'Sales', joinDate: '2023-03-10', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', department: 'Marketing', joinDate: '2023-04-05', lastLogin: '2024-01-21' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', department: 'IT', joinDate: '2023-05-12', lastLogin: '2024-01-20' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'User', status: 'Active', department: 'Finance', joinDate: '2023-06-18', lastLogin: '2024-01-18' },
    { id: 7, name: 'Edward Davis', email: 'edward@example.com', role: 'Manager', status: 'Active', department: 'Operations', joinDate: '2023-07-22', lastLogin: '2024-01-19' },
    { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'User', status: 'Inactive', department: 'HR', joinDate: '2023-08-30', lastLogin: '2024-01-05' },
    { id: 9, name: 'George Martinez', email: 'george@example.com', role: 'Admin', status: 'Active', department: 'IT', joinDate: '2023-09-14', lastLogin: '2024-01-21' },
    { id: 10, name: 'Helen Rodriguez', email: 'helen@example.com', role: 'User', status: 'Active', department: 'Sales', joinDate: '2023-10-08', lastLogin: '2024-01-20' },
    { id: 11, name: 'Ian Thompson', email: 'ian@example.com', role: 'Manager', status: 'Active', department: 'Marketing', joinDate: '2023-11-11', lastLogin: '2024-01-21' },
    { id: 12, name: 'Julia White', email: 'julia@example.com', role: 'User', status: 'Active', department: 'Finance', joinDate: '2023-12-01', lastLogin: '2024-01-19' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const filteredData = useMemo(() => {
    return users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof User];
      const bValue = b[sortConfig.key as keyof User];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    setSortConfig({ key: direction ? key : null, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (columnKey: keyof User) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="sort-icon" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="sort-icon sort-icon-active" />;
    }
    if (sortConfig.direction === 'desc') {
      return <ArrowDown className="sort-icon sort-icon-active" />;
    }
    return <ArrowUpDown className="sort-icon" />;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages || 1);
  };

  const handleView = (id: number) => {
    console.log('View user:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete user:', id);
  };

  return (
    <div className="user-dashboard">
      <h2 className="dashboard-title">User Dashboard</h2>
      
      <div className="search-container">
        <div className="search-icon-container">
          <Search className="search-icon" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search users..."
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('name')}
                  className="sort-button"
                >
                  <span>Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('email')}
                  className="sort-button"
                >
                  <span>Email</span>
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('role')}
                  className="sort-button"
                >
                  <span>Role</span>
                  {getSortIcon('role')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('status')}
                  className="sort-button"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('department')}
                  className="sort-button"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('joinDate')}
                  className="sort-button"
                >
                  <span>Join Date</span>
                  {getSortIcon('joinDate')}
                </button>
              </th>
              <th className="table-header-cell">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="sort-button"
                >
                  <span>Last Login</span>
                  {getSortIcon('lastLogin')}
                </button>
              </th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="table-cell table-cell-main">{user.name}</td>
                <td className="table-cell table-cell-secondary">{user.email}</td>
                <td className="table-cell table-cell-secondary">{user.role}</td>
                <td className="table-cell">
                  <span className={`status-badge ${
                    user.status === 'Active' ? 'status-active' : 'status-inactive'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="table-cell table-cell-secondary">{user.department}</td>
                <td className="table-cell table-cell-secondary">{user.joinDate}</td>
                <td className="table-cell table-cell-secondary">{user.lastLogin}</td>
                <td className="table-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => handleView(user.id)}
                      className="action-button view-button"
                      title="View"
                    >
                      <Eye className="action-icon" />
                    </button>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="action-button edit-button"
                      title="Edit"
                    >
                      <Edit className="action-icon" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="action-button delete-button"
                      title="Delete"
                    >
                      <Trash2 className="action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
        </div>
        <div className="pagination-controls">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'pagination-button-disabled' : ''}`}
            title="First page"
          >
            <ChevronsLeft className="pagination-icon" />
          </button>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'pagination-button-disabled' : ''}`}
            title="Previous page"
          >
            <ChevronLeft className="pagination-icon" />
          </button>
          <span className="page-count">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`pagination-button ${currentPage === totalPages || totalPages === 0 ? 'pagination-button-disabled' : ''}`}
            title="Next page"
          >
            <ChevronRight className="pagination-icon" />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`pagination-button ${currentPage === totalPages || totalPages === 0 ? 'pagination-button-disabled' : ''}`}
            title="Last page"
          >
            <ChevronsRight className="pagination-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTable;