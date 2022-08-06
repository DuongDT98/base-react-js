import { Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import SearchLayout from "./components/SearchLayout";

const RequestTypesManager = () => {
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState({ owner: 3 });
  const [isLoadData, setIsLoadData] = useState(false);
  // filter data
  const [filtersObj, setFilterObj] = useState({});
  const [dataFilter, setDataFilter] = useState([]);
  //Role
  const isRole = useCheckRoleUser();

  const history = useHistory();

  const getData = async () => {
    // Call APi get data
    var result = await getParams("/request-type");
    if (result) {
      setData(result || []);
    } else {
      setData([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const checkLoadData = () => {
    setIsLoadData(!isLoadData);
  };
  useEffect(() => {
    getData();
  }, [isLoadData]);

  // filter data
  useEffect(() => {
    getDataSearch(filtersObj);
  }, [filtersObj, data]);

  const getObjectFilter = (value) => {
    setFilterObj(value);
  };
  const getDataSearch = (value) => {
    let filtersArr =
      value != undefined
        ? data.filter((item) => {
            for (const property in value) {
              if (
                value[property] &&
                !item[property]
                  ?.toLowerCase()
                  ?.includes(value[property]?.toLowerCase())
              )
                return false;
            }
            return true;
          })
        : data;
    let dataFilter = filtersArr.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    setDataFilter(dataFilter);
  };

  //column data
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Mã đề nghị",
      dataIndex: "requestTypeCode",
      key: "requestTypeCode",
      align: "center",
    },
    {
      title: "Tên đề nghị",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "30%",
    },
    {
      title: "Nhóm đề nghị",
      dataIndex: "requestTypeGroup",
      key: "requestTypeGroup",
      align: "center",
      width: "30%",
      render: (item) => {
        // eslint-disable-next-line default-case
        switch (item) {
          case "THANH_TOAN":
            return "Nhóm Thanh Toán";
            break;
          case "BAO_LANH":
            return "Nhóm Bảo Lãnh";
            break;
          case "TAM_UNG":
            return "Nhóm Tạm Ứng";
            break;
          case "HOAN_UNG":
            return "Nhóm Hoàn Ứng";
            break;
          case "KHAC":
            return "Khác";
            break;
        }
      },
    },

    {
      title: "Thao tác",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          {isRole && (
            <Tooltip title="Chỉnh sửa">
              <i
                onClick={() => {
                  setDataSelect(record);
                  setAddRequestFormEditOpen(true);
                }}
                className="material-icons"
                style={{ cursor: "pointer" }}
              >
                edit
              </i>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Danh mục</span>
          <h3 className="page-title">Danh mục loại đề nghị</h3>
        </div>
      </div>
      {isRole && (
        <div>
          <button
            onClick={() => setAddRequestFormCreateOpen(true)}
            className="mb-2 mr-1 btn btn-primary btn-sm"
            style={{ fontSize: "15px" }}
          >
            Thêm
          </button>
        </div>
      )}

      {data.length > 0 && (
        <SearchLayout listData={data} getObjectFilter={getObjectFilter} />
      )}

      <Table
        columns={columns}
        dataSource={dataFilter}
        pagination={{
          position: ["topRight"],
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "500", "1000"],
        }}
      />

      {isRequestFormCreateOpen && (
        <ModalCreate
          listData={data}
          isRequestFormCreateOpen={isRequestFormCreateOpen}
          setAddRequestFormCreateOpen={setAddRequestFormCreateOpen}
          checkLoadData={checkLoadData}
        />
      )}
      {isRequestFormEditOpen && (
        <ModalEdit
          listData={data}
          dataSelect={dataSelect}
          isRequestFormEditOpen={isRequestFormEditOpen}
          setAddRequestFormEditOpen={setAddRequestFormEditOpen}
          checkLoadData={checkLoadData}
        />
      )}
    </div>
  );
};

export default RequestTypesManager;
