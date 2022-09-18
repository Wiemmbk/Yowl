import { ChevronDownIcon } from '@heroicons/react/solid'

const FilterComment = () => {
    return (
        <div className="flex items-center justify-between w-full border-b-[3px] border-light-purple dark:border-cream border-dashed px-1">
            <p className="font-Poppins text-light-purple dark:text-cream text-xl text-left ">All comments</p>
            <ChevronDownIcon className="text-light-purple dark:text-cream object-contain w-[35px]"/>
        </div>
    )
}

export default FilterComment;