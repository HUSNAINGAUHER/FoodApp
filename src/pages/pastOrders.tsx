import { Page } from '@/layouts/Page'

const pastOrders = [
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Delivery',
    status: 'Under Process',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
  {
    no: 'Order #234234',
    items: '5 Items',
    DP: 'Self-Pickup',
    status: 'Ready',
  },
]

const Success = () => {
  return (
    <>
      <Page name='Past Orders'>
        <div
          style={{ marginTop: '70px', paddingBottom: '48px' }}
          className='bg-white mx-auto px-20 py-5 rounded-lg w-max'
        >
          <div className='text-4xl font-semibold' style={{ marginTop: '98px' }}>
            Past Orders
          </div>

          <div style={{ marginTop: '25px' }}>
            <div
              className='grid grid-cols-5 gap-10 border-b pb-3'
              style={{ borderColor: '#E2E2E2' }}
            >
              <div className='text-sm font-semibold'>Order #</div>
              <div className='text-sm font-semibold'>Items Ordered</div>
              <div className='text-sm font-semibold'>Delivery/Pickup</div>
              <div className='text-sm font-semibold'>Status</div>
              <div className='text-sm font-semibold'>Action</div>
            </div>
            {pastOrders.map((PO) => (
              <div
                className='grid grid-cols-5 gap-5 border-b pb-3'
                style={{ marginTop: '27px', borderColor: '#E2E2E2' }}
              >
                <div className='text-sm font-semibold text-blue-900'>{PO.no}</div>
                <div className='text-sm '>{PO.items}</div>
                <div className='text-sm '>{PO.DP}</div>
                <div
                  className='text-sm '
                  style={{ color: PO.status !== 'Ready' ? '#F24500' : '#07A32A' }}
                >
                  {PO.status}
                </div>
                <div className='text-sm font-semibold text-blue-900 underline cursor-pointer'>
                  View / Re-Order
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Success
