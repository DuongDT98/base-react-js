import { Table, Tooltip } from "antd";
import useCheckRoleUser from "hook/useCheckRole";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import SearchLayout from "./components/SearchLayout";

const FinanceResourceManager = () => {
  const [isRequestFormCreateOpen, setAddRequestFormCreateOpen] =
    useState(false);
  const [isRequestFormEditOpen, setAddRequestFormEditOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [data, setData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [filtersObj, setFilterObj] = useState({});
  const isRole = useCheckRoleUser();

  const getData = async () => {
    // Call APi get data
    var result = await getParams("/finance-resource");
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

  const getDataSearch = useCallback(
    (value) => {
      let filtersArr =
        value !== undefined
          ? data.filter((item) => {
              for (const property in value) {
                if (value[property] !== item[property]) return false;
              }
              return true;
            })
          : data;
      let dataFilter = filtersArr.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setDataFilter(dataFilter);
    },
    [data]
  );

  useEffect(() => {
    getDataSearch(filtersObj);
  }, [filtersObj, data, getDataSearch]);

  const getObjectFilter = (value) => {
    setFilterObj(value);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Mã nguồn tài chính",
      dataIndex: "financeResourceCode",
      key: "financeResourceCode",
      align: "center",
    },
    {
      title: "Tên nguồn tài chính",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
  ];

  if (isRole) {
    columns.push({
      title: "Thao tác",
      key: "action",
      align: "center",
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
    });
  }
  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Danh mục</span>
          <h3 className="page-title">Danh mục nguồn tài chính</h3>
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

export default FinanceResourceManager;
