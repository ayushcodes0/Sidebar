import  { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

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
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="h-4 w-4 text-blue-600" />;
    }
    if (sortConfig.direction === 'desc') {
      return <ArrowDown className="h-4 w-4 text-blue-600" />;
    }
    return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
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
    <div className="w-full p-6 bg-white rounded-lg shadow-lg flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Dashboard</h2>
      
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search users..."
          className=" pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Email</span>
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Role</span>
                  {getSortIcon('role')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('joinDate')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Join Date</span>
                  {getSortIcon('joinDate')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Last Login</span>
                  {getSortIcon('lastLogin')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(user.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-yellow-600 hover:text-yellow-900 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTable;