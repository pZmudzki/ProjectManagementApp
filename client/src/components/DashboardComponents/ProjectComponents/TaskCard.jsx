import React from "react";

export default function TaskCard({ task }) {
  const { title, describtion, status } = task;
  return (
    <button type="button">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{describtion}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {status}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </button>
  );
}
