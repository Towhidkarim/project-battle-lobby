'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UpdatePackages } from '@/lib/actions/UpdatePackages';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import AlertButtonPackage from './AlterButtonPackage';

export default function PackageDataForm({
  packages,
}: {
  packages: { name: string; price: number }[];
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [packageInfo, setPackageInfo] = useState(packages);

  const addMore = () => {
    setPackageInfo((value) => [...value, { name: 'PackageName', price: 0 }]);
  };

  const updateName = (index: number, value: string) => {
    setPackageInfo((initial) =>
      initial.map((v, i) => (i === index ? { name: value, price: v.price } : v))
    );
  };
  const updatePrice = (index: number, value: number) => {
    setPackageInfo((initial) =>
      initial.map((v, i) => (i === index ? { name: v.name, price: value } : v))
    );
  };

  const remove = (value: { name: string; price: number }) => {
    setPackageInfo((item) => item.filter((v) => (v == value ? false : true)));
  };

  if (!packageInfo) addMore();
  //   console.log('hello');
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const res = await UpdatePackages(packageInfo);
    toast(res?.message);
    setIsPending(false);
    if (res?.ok) router.refresh();
  };

  return (
    <form
      onSubmit={formOnSubmit}
      className='max-w-[40rem] mx-auto p-5 m-2 border border-border/75 rounded-xl'
    >
      {packageInfo.map((value, index) => (
        <div key={index} className='flex gap-4 justify-center items-center'>
          <Input
            type='text'
            placeholder={value.name}
            defaultValue={value.name == 'PackageName' ? '' : value.name}
            className='my-4 max-w-64'
            onChange={(e) => updateName(index, e.target.value)}
            required
          />
          <Input
            type='number'
            min={0}
            defaultValue={value.price == 0 ? 0 : value.price}
            className='my-4 max-w-32'
            onChange={(e) => updatePrice(index, Number(e.target.value))}
            required
          />
          {/* <AlertButton value={value} deleteFunction={remove} /> */}
          <AlertButtonPackage value={value} deleteFunction={remove} />
        </div>
      ))}
      <div className='mx-auto w-96 flex gap-4 justify-center items-center'>
        <Button
          type='button'
          disabled={isPending}
          className='my-4 w-full mx-auto rounded-lg font-semibold'
          onClick={addMore}
        >
          <span className='text-2xl font-semibold'>+&nbsp;</span>
          Add More
        </Button>
        {/* <Button onClick={() => setNumbers(defaults)}> Defaults </Button> */}
      </div>
      <Button
        disabled={isPending}
        className='w-full rounded-2xl text-lg font-semibold p-6'
      >
        Save Changes
      </Button>
    </form>
  );
}
