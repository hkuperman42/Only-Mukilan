
def user_path(instance, filename):
    path = f"/profiles/pictures/{instance.user.id}/{filename}"
    return path